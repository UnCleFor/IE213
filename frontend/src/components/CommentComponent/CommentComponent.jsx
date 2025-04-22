import React, { useEffect } from 'react'

const CommentComponent = (props) => {
    const { dataHref, width } = props

    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse()
        }
    }, [])

    return (
        <div class="fb-comments" data-href={dataHref} data-width={width} data-numposts="5" ></div>
    )
}


export default CommentComponent
