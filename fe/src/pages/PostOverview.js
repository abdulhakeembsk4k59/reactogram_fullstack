import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import { API_BASE_URL } from '../../src/config'
import axios from 'axios';
import Swal from 'sweetalert2'

const PostOverview = () => {

    const [allposts, setAllposts] = useState([]);

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const getAllPosts = async () => {
        const response = await axios.get(`${API_BASE_URL}/allposts`);

        if (response.status === 200) {
            setAllposts(response.data.posts);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts'
            })
        }
    }

    const deletePost = async (postId) => {
        const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);
        if (response.status === 200) {
            getAllPosts();
        }
    }

    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <div className='container mt-md-5 mt-3'>
            <div className='row'>
                {allposts.map((post) => {
                    return (
                        <div className='col-md-4 mb-2' key={post._id}>
                            <Card postData={post} deletePost={deletePost} getAllPosts={getAllPosts} />
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default PostOverview