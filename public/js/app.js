$(document).ready(function() {
    
  $('.modal').modal();

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