export type WhatsAppMessage = ({
    msg: string;
    time: string;
    sent: boolean;
    isLink?: undefined;
    img?: undefined;
} | {
    msg: string;
    isLink: boolean;
    time: string;
    sent: boolean;
    img?: undefined;
} | {
    img: string;
    time: string;
    sent: boolean;
    msg?: undefined;
    isLink?: undefined;
});