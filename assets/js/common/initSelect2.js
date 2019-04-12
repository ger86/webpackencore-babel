import 'select2/dist/js/select2.full.min.js';

export default () => {
  const $select2 = $('.select2');
  const autocompleteUrl = $select2.data('autocomplete-url');
  $select2.select2({
    ajax: {
      url: autocompleteUrl,
      data: params => ({ s: params.term}),
      processResults: data => ({ results:  data.map(d => ({id: d.id, text: d.name}))})
    },
    theme: 'bootstrap4'
  });
}