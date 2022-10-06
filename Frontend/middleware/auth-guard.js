export default async function ({ $auth, redirect, store }) {
    console.log('reached  middleware');
    if (!$auth.user) {
        this.$router.push('/signin');
    }
    
}