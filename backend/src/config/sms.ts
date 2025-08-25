import { ENV } from "./ENV.ts";

const SMS = {
    SMTP_HOST: ENV.SMTP_HOST,
    SMTP_USER: ENV.SMTP_USER,
    SMTP_PASS: ENV.SMTP_PASS,
};

export const { SMTP_HOST, SMTP_USER, SMTP_PASS } = SMS;