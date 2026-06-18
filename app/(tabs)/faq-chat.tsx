import { ChatBubble } from "@/components/ChatBubble";
import { ChatMsg } from "@/lib/types";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type UiMsg = ChatMsg & { id: string };

const quickChips = [
  "식후 1시간 145인데 다음 식사는?",
  "식후 2시간 125인데 괜찮아?",
  "공복 102인데 뭐 조절해?",
  "외식 중인데 주문 팁",
  "편의점 간식 추천",
];

export default function FaqChat() {
  const listRef = useRef<FlatList<UiMsg>>(null);
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<UiMsg[]>([
    { id: "a0", role: "assistant", content: "안녕하세요! 임당 FAQ 챗이에요. 공복/식후 시점과 수치를 같이 적어주면 더 정확해요." },
  ]);

  const historyForServer = useMemo<ChatMsg[]>(
    () => messages.map((m) => ({ role: m.role, content: m.content })),
    [messages]
  );

  useEffect(() => {
    // 메시지 추가될 때 아래로 스크롤
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  }, [messages.length]);

  const getScenarioResponse = (userText: string): string => {
    const cleaned = userText.replace(/\s+/g, ""); // 공백 제거 후 비교

    // 1단계: "외식 중인데 주문 팁" 대응
    if (cleaned.includes("외식중인데주문팁") || cleaned.includes("외식")) {
      return [
        "✅ 요약:",
      "외식 시에는 밥/면의 양을 조절하고 채소와 단백질 위주 반찬을 늘리는 것이 혈당 관리에 핵심입니다.",
      "",
      "🧭 지금 할 일:",
      "• 밥이나 면은 '반 공기만' 혹은 소량으로 섭취하세요.",
      "• 고기, 두부, 생선 등 단백질과 식이섬유 채소 반찬을 먼저 드세요.",
      "• 달콤하고 짠 양념·소스류는 따로 요청해서 소량만 찍어 드세요.",
      "",
      "⚠️ 주의:",
      "• 튀김옷이 두꺼운 음식이나 정제 당류가 높은 양념 소스는 혈당 스파이크를 유발할 수 있으니 주의해 주세요.",
      "",
      "💡 추천 · 조언:",
      "• 식사 직후 자리에 바로 앉지 마시고 가벼운 제자리 걷기나 15분 산책을 더해주시면 수치 안정에 매우 효과적입니다.",
      "",
      "❓ 추가 질문: 어떤 메뉴를 주문하셨나요?"
      ].join("\n");
    }

    // 2단계: "샤브샤브 먹으려고" 대응
    if (cleaned.includes("샤브샤브") || cleaned.includes("샤브")) {
      return [
      "✅ 요약:",
      "샤브샤브는 풍부한 식이섬유 채소와 담백한 단백질(소고기 등)을 함께 즐길 수 있어 임당 관리 중 최고의 외식 메뉴입니다. 좋은 선택이십니다! 🍲",
      "",
      "🧭 지금 할 일:",
      "• 국물에 녹아든 나트륨과 당을 피해, 국물 섭취는 최소화하고 건더기 위주로 건져 드세요.",
      "• 칠리소스나 땅콩소스는 당 함량이 높으니 간장 소스 위주로 가볍게 찍어 드세요.",
      "• 식사 동선을 '채소 ➔ 고기 ➔ 탄수화물' 순서로 전개하세요.",
      "",
      "⚠️ 주의:",
      "• 마지막에 넣어 먹는 과도한 양의 칼국수 면이나 죽(밥)은 식후 혈당을 급격히 올릴 수 있으므로 가급적 소량만 맛보시길 권장합니다.",
      "",
      "💡 추천 · 조언:",
      "• 버섯, 청경채, 숙주를 충분히 추가하여 포만감을 확보하는 것을 적극 추천합니다.",
      "",
      "❓ 추가 질문: 샤브샤브에 어떤 재료를 주로 드실 예정인가요?"
    ].join("\n");
    }
    return "원하시는 질문 칩을 누르거나 질문을 입력해 주세요.";
  };

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const user: UiMsg = { id: `u_${Date.now()}`, role: "user", content: trimmed };
    setMessages((prev) => [...prev, user]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const replyContent = getScenarioResponse(trimmed);
      const bot: UiMsg = {
        id: `b_${Date.now()}`,
        role: "assistant",
        content: replyContent,
      };
      setMessages((prev) => [...prev, bot]);
      setLoading(false);
    }, 600);


    // try {
    //   const res = await chat(trimmed, historyForServer);
    //   const bot: UiMsg = { id: `b_${Date.now()}`, role: "assistant", content: res.answer };
    //   setMessages((prev) => [...prev, bot]);
    // } catch (e: any) {
    //   const bot: UiMsg = {
    //     id: `b_${Date.now()}`,
    //     role: "assistant",
    //     content: `에러가 발생했어요.\n${e?.message ?? ""}\n\n(backend 주소/포트, 네트워크를 확인해주세요.)`,
    //   };
    //   setMessages((prev) => [...prev, bot]);
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8EEF6" }}>
      <LinearGradient
        colors={["#F8EEF6", "#FFFFFF"]}
        locations={[0, 0.45]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1}}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 135 : 80}
      >
        {/* Message list area */}
        <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 16 }}>
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(m) => m.id}
            renderItem={({ item }) => <ChatBubble role={item.role} text={item.content} />}
            contentContainerStyle={{ paddingBottom: 14 }}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
            
          />
          {/* Input area (always visible) */}
        <View style={{ 
          paddingHorizontal: 14, 
          paddingTop: 10, 
          borderTopWidth: 1, 
          borderTopColor: "#F0E6EF",
           }}>
          {/* prettier chips */}
          <FlatList
            horizontal
            data={quickChips}
            keyExtractor={(x) => x}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, paddingBottom: 12 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => send(item)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  backgroundColor: "#ffffff",
                  borderWidth: 1,
                  borderColor: "#E9D5E5",
                }}
              >
                <Text style={{ color: "#6B4F6B", fontWeight: "600" }}>{item}</Text>
              </Pressable>
            )}
          />

        </View>

        

          <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-end" }}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="예: 식후 1시간 145 / 외식 중(메뉴: …)"
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#E9D5E5",
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 12,
                backgroundColor: "#ffffff",
                maxHeight: 120,
              }}
              multiline
              blurOnSubmit={false}
            />

            <Pressable
              onPress={() => send(input)}
              disabled={loading}
              style={{
                width: 62,
                height: 56,
                borderRadius: 16,
                backgroundColor: loading ? "#C4B5C4" : "#8B5C8B",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontWeight: "700" }}>전송</Text>}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
