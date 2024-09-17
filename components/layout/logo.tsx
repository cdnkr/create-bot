
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
            <h1 className={`font-extrabold ${textClassName}`}>create<span className='font-light'><span className="text-blue-600">{'['}</span>bot<span className="text-blue-600">{']'}</span></span></h1>
        </div>
    )
}

export default Logo
