import { getSession ,logout } from '@/actions';
import { redirect } from 'next/navigation';

const LogoutForm = async () => {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect("/");
    }
    return (
        <form action={logout}>
            <button>Logout</button>
        </form>
    );
}
    
export default LogoutForm;