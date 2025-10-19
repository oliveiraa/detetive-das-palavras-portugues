export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface TestAnswers {
  name: string;
  question1: string; 
  question2a_word: string;
  question2a_meaning: string;
  question2b_word: string;
  question2c_word: string;
  question3_dentist: string;
  question3_journalist: string;
  question3_flowershop: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
}
