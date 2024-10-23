export class GameIdea {
    id: string | null = "";
    description: string | null =  null;
    upvotes: number = 0;
    downvotes: number = 0;
    userVote: 'upvote' | 'downvote' | null = null;
    dateCreated: Date | null = null;
}
