'use client';

import SubmitButton from "@/components/elements/Buttons/SubmitButton/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addPost } from "@/utils/dendaitech/Post/POST/PostPOST";
import { Loader2, Plus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AvatarPost from "../post/components/avatar";
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
    const [sharedUrls, setSharedUrls] = useState([""]);
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (status === "loading") {
        return <Loader2 className="ml-2 h-4 w-4 animate-spin" />;
    };

    if (!session) {
        router.push("/signin");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await addPost(title, description, year, Number(grade), department, semester, sharedUrls, "/");
        if (result === true) {
            router.push("/");
        } else {
            setError(result as string);
        }
        setIsLoading(false);
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
            <Card className="max-w-full min-w-[95vw] md:min-w-[768px] md:max-w-screen-md mt-24 md:mt-32 mb-48 md:mx-12">
                <CardHeader>
                    <div className="flex">
                        <AvatarPost src={`/api/get-icon?id=${session.user.id}`} alt={`${session.user.username}`} fallback={`${session.user.username}`} />
                        <h2 className="ml-4 my-auto">{`${session.user.username}`}</h2>
                    </div>
                    <CardTitle>新しい投稿を作成</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Label className="block text-sm font-medium text-gray-700">共有URL</Label>
                            {sharedUrls.map((url, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <Input
                                        type="url"
                                        value={url}
                                        onChange={(e) => handleUrlChange(index, e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                    {index > 0 &&
                                        <Button
                                            variant="ghost"
                                            size={"icon"}
                                            onClick={() => removeUrlField(index)}
                                            className="ml-2 hover:text-red-500"
                                        >
                                            <X />
                                        </Button>
                                    }

                                </div>
                            ))}
                            {(sharedUrls.length < 4) && (
                                <Button type="button" variant="ghost" onClick={addUrlField} className="hover:text-blue-500 w-full bg-slate-100">
                                    <Plus />
                                </Button>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">タイトル</label>
                            <Input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">説明</label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label className="block text-sm font-medium text-gray-700">学年度</Label>
                            <Input
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
                        <SubmitButton preText={"投稿する"} postText={"投稿中"} disabled={isLoading} />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}