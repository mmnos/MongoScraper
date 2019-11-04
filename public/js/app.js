$(document).ready(function() {
    
  $('.modal').modal();

  $('.comment-list[data-id]').each(function(){

    let commentList = $(this);
    let articleId = commentList.data('id');
    $.get(`/api/articles/${articleId}`)
    .then((data) => {
        data.comment.forEach((comment) => {
          let listComment = $('<li/>');
          listComment.html(comment.title);
          commentList.append(listComment);
        });
    });
  });

  window.deleteArticle = function(articleId) {
    $.post('/api/delete/' + articleId)
    .then(() => {
      $(`[data-id=${articleId}]`).remove();
    });
  };

  window.saveComment = function(articleId) {

    let newComment = $(`#addcomment-${articleId}`).val();

    $.post(`/api/articles/${articleId}`, {
      title: newComment
    }).then(() => {
      window.location.reload();
    });

  };

  $('button#scrape').on("click", () => {
    $.get("api/scrape");
    window.location.reload();
  });

});