import { FiMenu } from 'react-icons/fi'

// blue: #4198c3

const Header = (props) => {
    return (
        <div className="h-[48px] bg-[#0F0E0F]">
        <button onClick={props.toggleSidebar} className="">
            <FiMenu className='text-white text-3xl ml-3 mt-2'/>
        </button>
        </div>
    )
}

export default Header