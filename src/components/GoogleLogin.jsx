import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const CustomGoogleLoginButton = () => {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const { access_token } = tokenResponse;

                // Send token to your backend API
                const res = await axios.post('https://mobile.cova.ai/auth/sso-login', {
                    token: access_token,
                    provider: 'google',
                });

                console.log('Login Success:', res.data);
            } catch (err) {
                console.error('Login failed:', err);
            }
        },
        onError: () => console.error('Login Failed'),
    });

    return (
        <button
            onClick={() => login()}
            className="bg-[#EAEAEABF]  md:px-6 px-8 py-2 rounded-[8px] flex items-center border-[1px] border-[#CACACA]"
        >
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* your svg paths here */}
            </svg>
            <span className="ml-2">Sign in with Google</span>
        </button>
    );
};

export default CustomGoogleLoginButton;
