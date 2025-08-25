import axios from 'axios';
import { SMTP_HOST, SMTP_USER, SMTP_PASS } from '../config/sms.ts';

interface SendOtpParams {
    message: string;
    phoneNumber: string;
}

const sendOtp = async ({ message, phoneNumber }: SendOtpParams): Promise<{ status: boolean; data: any }> => {
    for (let waitMsgId = 1; waitMsgId <= 100; waitMsgId++) {
        const url = `${SMTP_HOST}?user=${SMTP_USER}&pass=${SMTP_PASS}&cont=${message}&rec=${phoneNumber}&waitMsgId=${waitMsgId}`;

        try {
            const response = await axios(url);
            console.log('OTP sent successfully:', response.data);

            return {
                status: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error sending OTP:', error);
            throw error;
        }
    }
    // If no OTP was sent after all attempts, return a failure status
    return {
        status: false,
        data: null
    };
};

export default sendOtp;