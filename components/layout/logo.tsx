
interface Props {
    className?: string;
    textClassName?: string;

}

function Logo(props: Props) {
    const {
        className = '',
        textClassName = ''
    } = props

    return (
        <div className={`flex items-center ${className}`}>
            <h1 className={`uppercase font-extrabold text-lg ${textClassName}`}>Cr3ate<span className='uppercase font-light'>B0t</span></h1>
        </div>
    )
}

export default Logo
