export class GenNumHelper {
  public static formDate(date: Date): number {
    const year = Number(date.getFullYear());
    const month = Number(date.getMonth()); // Месяцы начинаются с 0, поэтому добавляем 1
    const day = Number(date.getDate());
    const time = Number(
      date.getHours() + date.getMinutes() + date.getSeconds(),
    );
    return year + month + day + time;
  }
}
