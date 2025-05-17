const Card = ({className, children}) => {


    return (
        <div
            className={`${className} card border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none`}>
            {children}
        </div>
    )
}
export default Card;