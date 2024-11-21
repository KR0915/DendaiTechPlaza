import { Card } from "@/components/ui/card";
import { getPostById } from "@/utils/dendaitech/Post/GET/PostGET";
import { convertUTCtoJST } from "@/utils/timeFormatter/timeFormatter";
import AvatarPost from "../components/avatar";
import BookmarkCountButton from "../components/bookmarkCountButton/bookmarkCountButton";
import Comments from "../components/comments";
import Ogps from "../components/ogps";
import Tag from "../components/tag";

export default async function post({ params }: { params: Promise<{ id: string }> }) {
    const postParams = await params;
    const post = await getPostById(postParams.id, 0, 5, 0, 3);
    const postUpadateAt = convertUTCtoJST(post.updatedAt);


    return (
        <><div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
            <Card className="max-w-screen-sm md:max-w-screen-md mt-48 mb-48">

                {/* OGP Grid */}
                <div className="rounded-lg p-4">
                    {post.sharedUrls ? (
                        <Ogps urls={post.sharedUrls} />
                    ) : (
                        <p className="text-gray-500 text-center py-4">共有されたURLはありません</p>
                    )}
                </div>

                <div className="p-8">
                    <div className="flex flex-col gap-1 mb-6">
                        <div className="flex items-center gap-2">
                            <AvatarPost src={`/user/icons/${post.userId}.webp`} alt={post.username} fallback={post.username} size="lg"/>
                            <h2 className="font-bold text-lg">{`${post.username}`}</h2>
                        </div>
                        <div className="grid grid-cols-5 items-center gap-2">
                            <div className="col-span-4 font-bold text-xl"><h1>{post.title}</h1></div>
                            <div>
                                <BookmarkCountButton count={post.likesCount} postId={post.postId} />
                            </div>
                        </div>
                        <span className="text-gray-500 text-sm">{postUpadateAt}</span>
                        <div className="flex gap-2 mt-1">
                            <Tag content={post.year.toString()} />
                            <Tag content={post.departmentName} />
                            <Tag content={`${post.grade.toString()}年`} />
                            <Tag content={post.semester} />
                        </div>
                    </div>

                    <p className="text-gray-700 mb-6">
                        {post.description}
                    </p>

                    <div>
                        <h2 className="font-bold mb-">コメント</h2>
                    </div>
                    <Comments commnents={post.comments} />
                </div>

            </Card>
        </div>
        </>
    );
}