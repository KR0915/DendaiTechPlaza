export function convertUTCtoJST(utcDateString: string): string {
    try {
        // UTC日時文字列をDateオブジェクトに変換
        const utcDate = new Date(utcDateString);

        // 日付が無効な場合はエラーをスロー
        if (isNaN(utcDate.getTime())) {
            throw new Error('Invalid date format');
        }

        // JSTのオフセット（ミリ秒）を計算: UTC+9時間
        const jstOffset = 9 * 60 * 60 * 1000;

        // UTC時間にオフセットを加えてJST時間を取得
        const jstDate = new Date(utcDate.getTime() + jstOffset);

        // 日付と時刻の各部分を取得
        const year = jstDate.getFullYear();
        const month = String(jstDate.getMonth() + 1).padStart(2, '0');
        const day = String(jstDate.getDate()).padStart(2, '0');
        const hours = String(jstDate.getHours()).padStart(2, '0');
        const minutes = String(jstDate.getMinutes()).padStart(2, '0');
        const seconds = String(jstDate.getSeconds()).padStart(2, '0');

        // フォーマットされた文字列を作成
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    } catch (error) {
        if (error instanceof Error) {
            return `Error: ${error.message}`;
        }
        return 'An unknown error occurred';
    }
}