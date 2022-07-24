export class Tweet{
    updateTweet(EditTweet: (input: Tweet) => void) {
      throw new Error('Method not implemented.');
    }
    id:number=0;
    authorName:any='';
    authorLogo:any='';
    authorSlug:any='';
    tweetTime:any='';
    tweetDescription:any='';
    tweetImage:any='';
}