export interface Log {
  id?: number;
  action: string;
  tableName: string;
  userId: string;
  timestamp: Date;
}
