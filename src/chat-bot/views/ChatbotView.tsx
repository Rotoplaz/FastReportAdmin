import {
    Branch,
    BranchMessages, BranchNext, BranchPage, BranchPrevious, BranchSelector,
} from '@/components/ai-elements/branch';
import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
    PromptInput,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    type PromptInputMessage,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputFooter,
} from '@/components/ai-elements/prompt-input';
import {
    Message, MessageAvatar,
    MessageContent,
} from '@/components/ai-elements/message';

import {Response} from '@/components/ai-elements/response';

import {
    Suggestion,
    Suggestions,
} from '@/components/ai-elements/suggestion';

import {useState, useCallback, useRef} from 'react';
import type {ToolUIPart} from 'ai';
import {nanoid} from 'nanoid';
import {useAuthStore} from "@/shared/store";
import {Source, Sources, SourcesContent, SourcesTrigger} from "@/components/ai-elements/sources.tsx";
import {Reasoning, ReasoningContent, ReasoningTrigger} from "@/components/ai-elements/reasoning.tsx";

type MessageType = {
    key: string;
    from: 'user' | 'assistant';
    sources?: { href: string; title: string }[];
    versions: {
        id: string;
        content: string;
    }[];
    reasoning?: {
        content: string;
        duration: number;
    };
    tools?: {
        name: string;
        description: string;
        status: ToolUIPart['state'];
        parameters: Record<string, unknown>;
        result: string | undefined;
        error: string | undefined;
    }[];
    avatar?: string;
    name: string;
};


const suggestions = [
    '¿Cuántos reportes están en prioridad alta?',
    'Muestra los incidentes completados',
    'Lista los problemas recientes en el laboratorio',
    '¿Qué reportes siguen pendientes?',
];

const ChatbotView = () => {
    const {jwt} = useAuthStore();
    const [text, setText] = useState<string>('');
    const [status, setStatus] = useState<'submitted' | 'streaming' | 'ready' | 'error'>('ready');
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const shouldCancelRef = useRef<boolean>(false);

    const stop = useCallback(() => {
        shouldCancelRef.current = true;
        setStatus('ready');
        setStreamingMessageId(null);
    }, []);

    const streamFromN8n = useCallback(async (messageId: string, prompt: string) => {
        try {
            setStatus('streaming');
            setStreamingMessageId(messageId);
            shouldCancelRef.current = false;

            const history = messages.map(m => ({
                role: m.from === 'user' ? 'user' : 'assistant',
                content: m.versions[m.versions.length - 1].content,
            }));

            const payload = {
                history,
                message: prompt,
            };

            const response = await fetch('http://localhost:5678/webhook/73508274-88fc-423e-a42a-4d9cb1e49ea6', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.body) throw new Error('No se recibió stream del servidor.');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let partialContent = '';

            while (true) {
                const {done, value} = await reader.read();
                if (done || shouldCancelRef.current) break;

                const chunk = decoder.decode(value, {stream: true});
                const lines = chunk.split('\n').filter(Boolean);

                for (const line of lines) {
                    try {
                        const event = JSON.parse(line);
                        if (event.type === 'item' && event.content) {
                            partialContent += event.content;
                            setMessages(prev =>
                                prev.map(msg =>
                                    msg.versions.some(v => v.id === messageId)
                                        ? {
                                            ...msg,
                                            versions: msg.versions.map(v =>
                                                v.id === messageId ? {...v, content: partialContent} : v,
                                            ),
                                        }
                                        : msg,
                                ),
                            );
                        }
                    } catch {
                    }
                }
            }
            setStatus('ready');
            setStreamingMessageId(null);
        } catch (error) {
            console.error('Error en streaming:', error);
            setStatus('error');
        }
    }, [messages, jwt]);

    const addUserMessage = useCallback(
        (content: string) => {
            const userMessage: MessageType = {
                key: nanoid(),
                from: 'user',
                versions: [{id: nanoid(), content}],
                name: 'Usuario',
            };
            setMessages(prev => [...prev, userMessage]);

            const assistantMessageId = nanoid();
            const assistantMessage: MessageType = {
                key: nanoid(),
                from: 'assistant',
                versions: [{id: assistantMessageId, content: ''}],
                name: 'Agente',
            };
            setMessages(prev => [...prev, assistantMessage]);

            streamFromN8n(assistantMessageId, content);
        },
        [streamFromN8n],
    );

    const handleSubmit = (message: PromptInputMessage) => {
        if (status === 'streaming' || status === 'submitted') {
            stop();
            return;
        }
        const hasText = Boolean(message.text);
        if (!hasText) return;

        setStatus('submitted');
        addUserMessage(message.text || '');
        setText('');
    };

    return (
        <div className="max-w-4xl mx-auto  relative size-full h-[calc(100vh-10vh)]">
            <div className="flex flex-col h-full">
                <Conversation className="h-full">
                    <ConversationContent>
                        {messages.map(({versions, ...message}) => (
                            <Branch defaultBranch={0} key={message.key}>
                                <BranchMessages>
                                    {versions.map((version) => (
                                        <Message
                                            from={message.from}
                                            key={`${message.key}-${version.id}`}
                                        >
                                            <div>
                                                {message.sources?.length && (
                                                    <Sources>
                                                        <SourcesTrigger count={message.sources.length}/>
                                                        <SourcesContent>
                                                            {message.sources.map((source) => (
                                                                <Source
                                                                    href={source.href}
                                                                    key={source.href}
                                                                    title={source.title}
                                                                />
                                                            ))}
                                                        </SourcesContent>
                                                    </Sources>
                                                )}
                                                {message.reasoning && (
                                                    <Reasoning duration={message.reasoning.duration}>
                                                        <ReasoningTrigger/>
                                                        <ReasoningContent>
                                                            {message.reasoning.content}
                                                        </ReasoningContent>
                                                    </Reasoning>
                                                )}
                                                <MessageContent>
                                                    <Response>{version.content}</Response>
                                                </MessageContent>
                                            </div>
                                        </Message>
                                    ))}
                                </BranchMessages>
                                {versions.length > 1 && (
                                    <BranchSelector from={message.from}>
                                        <BranchPrevious/>
                                        <BranchPage/>
                                        <BranchNext/>
                                    </BranchSelector>
                                )}
                            </Branch>
                        ))}
                    </ConversationContent>
                    <ConversationScrollButton/>
                </Conversation>
                <div className="grid shrink-0 gap-4 pt-4">
                    <Suggestions className="">
                        {suggestions.map((suggestion) => (
                            <Suggestion
                                key={suggestion}
                                onClick={() => addUserMessage(suggestion)}
                                suggestion={suggestion}
                            />
                        ))}
                    </Suggestions>
                    <div className="w-full px-4 pb-4">
                        <PromptInput globalDrop multiple onSubmit={handleSubmit}>
                            <PromptInputBody>
                                <PromptInputAttachments>
                                    {(attachment) => <PromptInputAttachment data={attachment}/>}
                                </PromptInputAttachments>
                                <PromptInputTextarea
                                    onChange={(event) => setText(event.target.value)}
                                    ref={textareaRef}
                                    value={text}
                                />
                            </PromptInputBody>
                            <PromptInputFooter>
                                <PromptInputSubmit
                                    disabled={(!text.trim() && !status) || status === 'streaming'}
                                    status={status}
                                />
                            </PromptInputFooter>
                        </PromptInput>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotView;
