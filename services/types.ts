export interface UserProfileResponse {
  // Users 테이블 데이터
  user_id: number;
  nickname: string;
  
  // UserProfiles 테이블 데이터
  profile_id: number;
  due_date: string;
  target_bloodsugar: number;
  target_carb_per_meal: number;
  target_calories: number;
  dietary_restrictions: string[];
  flavor_preferences: string[];
  health_notes: string;
  updated_at: string;

  // API 계산 데이터
  pregnancy_week: number;
  d_day: number;
}

export interface BloodSugarRequest {
  user_id: number;
  measured_at: string;
  value: number;
  recorded_type: string;
  memo?: string;       
  risk_level?: string;
  meal_log_id?: number;
}

// ─── Daily Report ───
export interface BloodSugarTimelineItem {
  id: number;
  type: 'ACTUAL' | 'PREDICTED';
  value: number;
  measured_at: string;
  record_type: string;
  related_meal?: {
    meal_log_id: number;
    meal_type: string;
    foods: string[];
    eaten_at: string;
  };
  advice?: string;
}

export interface BloodSugarGraphData {
  target_bloodsugar: number;
  timeline: BloodSugarTimelineItem[];
}

export interface MealLogItem {
  meal_log_id: number;
  meal_type: string;
  eaten_at: string;
  img_url: string;
  total_calories: number;
  foods: string[];
}

export interface DailyReportResponse {
  date: string;
  summary: {
    daily_total_calories: number;
    total_carbs: number;
    total_protein: number;
    total_fat: number;
  };
  blood_sugar_graph: {
    target_bloodsugar: number;
    timeline: BloodSugarTimelineItem[];
  };
  meal_logs: MealLogItem[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

export interface ChatRequest {
  sessionId: number;
  message: string;
  history: ChatMessage[];
}