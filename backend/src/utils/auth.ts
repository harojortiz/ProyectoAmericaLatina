import bcrypt from 'bcryptjs';

export const generatePin = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};
