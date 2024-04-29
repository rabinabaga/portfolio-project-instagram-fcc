export async function getSuggestedProfiles({following, loggedInUserDocId}){
    const result = db.users.find().limit(10)
}