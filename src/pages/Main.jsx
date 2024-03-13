import React from 'react'
import { Link } from 'react-router-dom';
function Main() {
    return (
        <div className='container m-5 text-center'>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi laudantium eius vitae soluta minus ut aliquam in, aspernatur adipisci. Temporibus doloribus, dicta adipisci quas officia maxime doloremque consequuntur eius sed! Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptatem, accusantium ab, alias recusandae laudantium eligendi facere, minus pariatur inventore tenetur aliquid consectetur modi eaque rerum explicabo voluptatum. At, modi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam veniam a odit id hic totam ipsam suscipit nostrum eos, eligendi magnam odio nemo nam sapiente, maiores eveniet, in iste doloremque. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione fugiat dicta odit, quis molestias consectetur cumque provident obcaecati, veritatis laudantium expedita quo vitae, quaerat reprehenderit quod ut neque repudiandae pariatur!</p>

            <button className='btn btn-info'>
                <Link  to={'/login'} style={{textDecoration:"none"}}>Click to Login-Page</Link>
            </button>
        </div>
    )
}

export default Main