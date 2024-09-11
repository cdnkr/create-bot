
interface Props {
    className?: string;
    textClassName?: string;

}

function Logo(props: Props) {
    const {
        className = '',
        textClassName = 'text-2xl text-black'
    } = props

    return (
        <div className={`flex items-center ${className}`}>
            <h1 className={`font-extrabold ${textClassName}`}>cr3ate.<span className='font-light'>bot</span></h1>
        </div>
    )
}

export default Logo
