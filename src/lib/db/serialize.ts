type WithId = { id: string };

export function withId<T extends WithId>(row: T): T & { _id: string } {
  return { ...row, _id: row.id };
}

export function withIds<T extends WithId>(rows: T[]): Array<T & { _id: string }> {
  return rows.map(withId);
}

export function isDbId(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
