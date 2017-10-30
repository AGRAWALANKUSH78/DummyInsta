const likePost = (id) => {
  var elem = document.getElementById("likebutton"); 
  $.ajax({
    type: 'POST',
    url: `/post/${id}/like`,
    success: (result) => {
      window.location = '/post/' + id;
      alert(result.action);
      if(elem.innerHTML == "Like") {
        elem.innerHTML = "Liked";
      } else {
        elem.innerHTML = "Like";
      }
    }
  });
};

const commentPost = (id) => {  
  var comment = document.getElementById("newcomment").value;
  if(comment == ""){
  } else {
    $.ajax({
      type: 'POST',
      url: `/post/${id}/comment`,
      data : {
        'Comment' : comment
      },
      success: (result) => {
        window.location = '/post/' + id;
      }
    })
  }
};

const replyPost = (postId, commentId) => {  
  var reply = document.getElementById(`myreply_${commentId}`).value;
  if(reply == ""){
  } else {
    $.ajax({
      type: 'POST',
      url: `/post/${postId}/comment/${commentId}/reply`,
      data : {
        'Reply' : reply
      },
      success: (result) => {
        window.location = '/post/' + postId;
      }
    })
  }
};

const deletePost = (postId, user) => {
  $.ajax({
    type: 'DELETE',
    url: `/post/${postId}/delete`,
    success: (result) => {
      alert(result.message);
      window.location = `/user/${user}`;
    }
  });
};