_ = require 'underscore'

class TagManager
  constructor: ( @id2tags ) ->
    @_tags = {}
  selected_tags:        -> k for own k, v of @_tags when v is yes
  toggle_tag:   ( tag ) -> @_tags[tag] = if @_tags[tag] is true then false else true
  select_tag:   ( tag ) -> @_tags[tag] = yes
  deselect_tag: ( tag ) -> @_tags[tag] = no
  count_for_tag:( tag ) ->
    x = @_tags[tag]
    @_tags[tag] = yes
    count = @visible_ids().length
    @_tags[tag] = x
    count
  all_tags: -> @_all_tags ?= do =>
    r = {}
    for own id, tags of @id2tags
      r[t] = yes for t in tags
    k for own k of r
  is_visible: ( id ) ->
    st = @selected_tags()
    return yes if st.length is 0
    tags = ( @id2tags[id] or [] )
    return no unless _.every st, (x) => x in @id2tags[id]
    yes
  visible_ids: -> id for own id of @id2tags when @is_visible id


module.exports = ( x ) -> new TagManager x

test = ->
  tm = new TagManager
    aldo:  ['person', 'mammal']
    mambo: ['dog',    'mammal']
    bob:   ['person', 'robot']
  console.log tm.all_tags()
  console.log tm.visible_ids()
  tm.select_tag 'person'
  console.log tm.selected_tags()
  console.log tm.visible_ids()
  console.log tm.count_for_tag('person')
  console.log tm.count_for_tag('mammal')
  tm.select_tag 'mammal'
  console.log tm.visible_ids()