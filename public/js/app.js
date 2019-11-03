$(document).ready(function() {
    
  $('.modal').modal();

  $(`.comment-list[data-id]`).each(function(){

    let commentList = $(this);
    let articleId = commentList.data('id');
    $.get(`/article/${articleId}`)
    .then((data)=>{
        if (data.title){
          let listComment = $('<li/>');
          listComment.html(data.title);
          commentList.append(listComment);
        }
    })
  });

  window.deleteArticle = function(articleId){
    $.post('/delete/' + articleId)
    .then(()=>{
      $(`[data-id=${articleId}]`).remove();
    })
  }

  window.saveComment = function(articleId){

    let newComment = $('#addcomment').val();

    $.post(`/articles/${articleId}`, {
      title: newComment
    });
  }
});