'use client';

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { addPost } from "@/utils/dendaitech/Post/POST/PostPOST";
import { Loader2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AvatarPost from "../post/components/avatar"; // AvatarPost コンポーネントをインポート
import { ItemSelect } from "./components/ItemSelect";


const departmentsData = [
    "AD", "AJ", "EK", "EF", "ES", "EC", "EJ", "EH", "FI", "FA",
    "FR", "NC", "NM", "NE", "RB", "RE", "RD", "RU", "RM", "RG"
]

const semestersData = ["前期", "後期", "その他"];

const gradeData = ["1", "2", "3", "4"];

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState(new Date().getFullYear());
    const [grade, setGrade] = useState("1");
    const [department, setDepartment] = useState("ES");
    const [semester, setSemester] = useState("前期");
    const [sharedUrls, setSharedUrls] = useState(["", ""]);
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Loader2 className="ml-2 h-4 w-4 animate-spin" />;
    };

    if (!session) {
        router.push("/signin");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await addPost(title, description, year, Number(grade), department, semester, sharedUrls, "/");
        if (result === true) {
            router.push("/");
        } else {
            setError(result as string);
        }
    };

    const handleUrlChange = (index: number, value: string) => {
        const newUrls = [...sharedUrls];
        newUrls[index] = value;
        setSharedUrls(newUrls);
    };

    const addUrlField = () => {
        if (sharedUrls.length < 4) {
            setSharedUrls([...sharedUrls, ""]);
        }
    };

    const removeUrlField = (index: number) => {
        const newUrls = sharedUrls.filter((_, i) => i !== index);
        setSharedUrls(newUrls);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200 postContent">
            <Card className="relative max-w-full md:max-w-screen-md mt-48 mb-48 p-8">
                <div className="absolute top-4 left-4">
                    <AvatarPost src={`/api/get-icon?id=${session.user.id}`} alt={session.user.username} fallback={session.user.username} size="md" />
                </div>
                <h1 className="text-2xl mb-4">新しい投稿を作成</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">共有URL</label>
                        {sharedUrls.map((url, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleUrlChange(index, e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => removeUrlField(index)}
                                    className="ml-2 text-red-500"
                                >
                                    <X />
                                </button>
                            </div>
                        ))}
                        {sharedUrls.length < 4 && (
                            <button type="button" onClick={addUrlField} className="text-blue-500">
                                URLを追加
                            </button>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">タイトル</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">説明</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">学年度</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-700">学年</Label>
                        <ItemSelect
                            data={gradeData}
                            labelName={"学年"}
                            value={grade}
                            onChange={(value) => setGrade(value)} />
                    </div>
                    <div className="mb-4">
                        <Label className="text-sm font-medium text-gray-700">学部</Label>
                        <ItemSelect
                            labelName={"学部"}
                            data={departmentsData}
                            value={department}
                            onChange={(value) => setDepartment(value)} />
                    </div>
                    <div className="mb-4">
                        <Label className="text-sm font-medium text-gray-700">学期</Label>
                        <ItemSelect
                            labelName={"学期"}
                            data={semestersData}
                            value={semester}
                            onChange={(value) => setSemester(value)} />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        投稿する
                    </button>
                </form>
            </Card>
        </div>
    );
}