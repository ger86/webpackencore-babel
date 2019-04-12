$('body').on('change', '.custom-file-input', function() {
  const filename = $(this).val();
  $(this).next('.custom-file-label').html(filename.replace(/^.*[\\\/]/, ''));
})