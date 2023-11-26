import React, { useState } from 'react'
import './Card.css'
import moreAction from '../images/more-action.PNG'
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../src/config'
import axios from 'axios';

const Card = (props) => {
    const user = useSelector(state => state.userReducer);
    const [commentBox, setCommentBox] = useState(false)
    const [comment, setComment] = useState("")

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const submitComment = async (postId) => {
        setCommentBox(false);
        const request = { "postId": postId, "commentText": comment };
        const response = await axios.put(`${API_BASE_URL}/comment`, request, CONFIG_OBJ);
        if (response.status === 200) {
            props.getAllPosts();
        }
    }
    const likeDislikePost = async (postId, type) => {
        const request = { "postId": postId };
        const response = await axios.put(`${API_BASE_URL}/${type}`, request, CONFIG_OBJ);
        if (response.status === 200) {
            props.getAllPosts();
        }
    }
    return (
        <div>
            <div className="card shadow-sm">
                <div className="card-body px-2">
                    <div className='row'>
                        <div className='col-6 d-flex'>
                            <img className='p-2 post-profile-pic' alt="profile pic" src="https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2ludGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                            <div className='mt-2'>
                                <p className='fs-6 fw-bold'>{props.postData.author.fullName}</p>
                                <p className='location'>{props.postData.location}</p>
                            </div>
                        </div>
                        {props.postData.author._id == user.user._id ? <div className='col-6'>
                            <img onClick={() => props.deletePost(props.postData._id)} style={{ cursor: "pointer" }} className='float-end fs-3 p-2 mt-2' alt="more action" src={moreAction} />
                        </div> : ""}
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <img style={{ borderRadius: '15px' }} className='p-2 img-fluid' alt={props.postData.description} src={props.postData.image} />
                        </div>
                    </div>
                    <div className='row my-3'>
                        <div className='col-6 d-flex'>
                            <i onClick={() => likeDislikePost(props.postData._id, 'like')} className="ps-2 fs-4 fa-regular fa-thumbs-up"></i>
                            <i onClick={() => likeDislikePost(props.postData._id, 'unlike')} className="ps-2 fs-4 fa-regular fa-thumbs-down"></i>
                            <i onClick={() => setCommentBox(true)} className="ps-3 fs-4 fa-regular fa-comment"></i>
                        </div>
                        <div className='col-6'>
                            <span className='pe-2 fs-6 fw-bold float-end'>{props.postData.likes.length} likes</span>
                        </div>
                    </div>
                    {commentBox ? <div className='row mb-2'>
                        <div className='col-8'>
                            <textarea onChange={(e) => setComment(e.target.value)} className='form-control'></textarea>
                        </div>
                        <div className='col-4'>
                            <button className='btn btn-primary' onClick={() => submitComment(props.postData._id)}>Submit</button>
                        </div>
                    </div> : ""}
                    {props.postData.comments.map((comment) => {
                        return (<div className='row'>
                            <div className='col-12'>
                                <p>{comment.commentText} - {comment.commentedBy.fullName}</p>
                            </div>
                        </div>)
                    })}
                    <div className='row'>
                        <div className='col-12'>
                            <span className='p-2 text-muted'>2 Hours Ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card