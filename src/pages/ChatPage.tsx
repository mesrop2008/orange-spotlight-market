import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { users } from '@/data/users';

const ChatPage: React.FC = () => {
  const { convId } = useParams<{ convId: string }>();
  const { user } = useAuth();
  const { conversations, sendMessage, markConversationRead, listings } = useApp();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  if (!user) { navigate('/login'); return null; }

  const userConversations = conversations.filter(c => c.participants.includes(user.id));
  const activeConv = convId ? conversations.find(c => c.id === convId) : userConversations[0];

  useEffect(() => {
    if (activeConv) {
      markConversationRead(activeConv.id, user.id);
    }
  }, [activeConv?.id, activeConv?.messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages.length]);

  const handleSend = () => {
    if (!text.trim() || !activeConv) return;
    const otherId = activeConv.participants.find(p => p !== user.id)!;
    sendMessage(activeConv.id, user.id, otherId, activeConv.listingId, text.trim());
    setText('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
          {/* Conversation list */}
          <div className="rounded-xl border bg-card overflow-y-auto">
            {userConversations.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">No conversations yet</div>
            ) : (
              userConversations.map(conv => {
                const otherId = conv.participants.find(p => p !== user.id)!;
                const other = users.find(u => u.id === otherId);
                const listing = listings.find(l => l.id === conv.listingId);
                const lastMsg = conv.messages[conv.messages.length - 1];
                const unread = conv.messages.filter(m => m.receiverId === user.id && !m.read).length;
                const isActive = activeConv?.id === conv.id;

                return (
                  <button key={conv.id} onClick={() => navigate(`/chat/${conv.id}`)}
                    className={`w-full flex items-center gap-3 p-3 border-b text-left hover:bg-secondary/50 transition-colors ${isActive ? 'bg-accent' : ''}`}>
                    <img src={other?.avatar || ''} alt="" className="h-10 w-10 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{other?.name}</p>
                        {lastMsg && <span className="text-[10px] text-muted-foreground shrink-0">{new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{listing?.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">{lastMsg?.text}</p>
                        {unread > 0 && <span className="h-4 min-w-[16px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium shrink-0">{unread}</span>}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Messages */}
          <div className="md:col-span-2 rounded-xl border bg-card flex flex-col">
            {activeConv ? (
              <>
                <div className="p-3 border-b flex items-center gap-3">
                  {(() => {
                    const otherId = activeConv.participants.find(p => p !== user.id)!;
                    const other = users.find(u => u.id === otherId);
                    const listing = listings.find(l => l.id === activeConv.listingId);
                    return (
                      <>
                        <img src={other?.avatar || ''} alt="" className="h-8 w-8 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-sm">{other?.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{listing?.title}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {activeConv.messages.map(msg => {
                    const isMine = msg.senderId === user.id;
                    return (
                      <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${isMine ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-secondary rounded-bl-md'}`}>
                          <p className="text-sm">{msg.text}</p>
                          <p className={`text-[10px] mt-1 ${isMine ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>
                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={text}
                      onChange={e => setText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button onClick={handleSend} disabled={!text.trim()}
                      className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
