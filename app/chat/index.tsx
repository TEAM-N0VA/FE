import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { createChatSession, sendChatMessage } from '@/services/api';

// ─── Interfaces ──────────────────────────────────────────────────────────────
interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  quickReplies?: string[];
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ChatScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '무엇을 도와드릴까요? 자주 묻는 질문을 선택하거나 직접 입력해보세요.',
      sender: 'bot',
      quickReplies: ['식후 혈당이 높아요', '외식 메뉴 추천', '저혈당 대처 방법'],
    },
  ]);

  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const initSession = async () => {
      try {
        const res = await createChatSession(12);
        const nextSessionId = res?.result?.sessionId ?? res?.sessionId;
        if (nextSessionId) setSessionId(nextSessionId);
      } catch (e) {
        console.error(e);
      }
    };

    initSession();
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      let activeSessionId = sessionId;

      if (!activeSessionId) {
        const sessionRes = await createChatSession(12);
        activeSessionId = sessionRes?.result?.sessionId ?? sessionRes?.sessionId ?? null;
        if (activeSessionId) setSessionId(activeSessionId);
      }

      const res = await sendChatMessage({
        sessionId: activeSessionId,
        message: text,
        history: messages.map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
      });

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: res?.result?.answer ?? res?.answer ?? res?.message ?? '답변을 받지 못했습니다.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: '서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M15 18l-6-6 6-6" stroke="#494145" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>밀당 챗봇</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* ── Chat List ── */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View style={[styles.messageRow, item.sender === 'user' ? styles.userRow : styles.botRow]}>
              <View style={[styles.bubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
                <Text style={styles.messageText}>{item.text}</Text>
                
                {/* ── Quick Replies inside the First Bubble ── */}
                {item.quickReplies && (
                  <View style={styles.quickReplyContainer}>
                    {item.quickReplies.map((reply: string) => (
                      <TouchableOpacity
                        key={reply}
                        style={styles.chip}
                        onPress={() => sendMessage(reply)}
                      >
                        <Text style={styles.chipText}>{reply}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          )}
        />

        {/* ── Input Bar ── */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="메시지를 입력하세요"
            value={inputText}
            onChangeText={setInputText}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
            onPress={() => sendMessage(inputText)}
            disabled={isLoading}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F7F7' },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0DCDE',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#926897' },
  backButton: { padding: 8 },
  chatList: { padding: 16, paddingBottom: 20 },
  messageRow: { marginBottom: 16, flexDirection: 'row', width: '100%' },
  userRow: { justifyContent: 'flex-end' },
  botRow: { justifyContent: 'flex-start' },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  botBubble: {
    backgroundColor: '#FDE5F2',
    borderBottomLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0DCDE',
    borderBottomRightRadius: 0,
  },
  messageText: { fontSize: 15, color: '#494145', lineHeight: 20 },
  quickReplyContainer: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#926897',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipText: { fontSize: 13, color: '#926897', fontWeight: '500' },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0DCDE',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
  },
  sendButton: {
    backgroundColor: '#926897',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
