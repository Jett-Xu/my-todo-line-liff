export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}
