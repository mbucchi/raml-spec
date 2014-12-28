$ ->

  # make sure we are in the projects section
  return if $('.projects2').length is 0

  radioactive = require 'radioactive'
  _           = require 'underscore'
  tag_manager = require './tag_manager'

  require('radioactive-html') radioactive, jQuery, window.document

  tag_types =
    role:
      label: 'Role'
    type:
      label: 'Type'
    tech:
      label: 'Tech'
    activity:
      label: 'Activity'
    license:
      label: 'License'
    status:
      label: 'Status'
    owner:
      label: 'Owner/Contributor'

  serial = do ( i = 0 ) -> -> i++

  split_tags = ( str ) -> ( str or '' ).split(',').map((x) -> x.trim()).filter (x) -> x isnt ''

  serial_cell = radioactive serial()

  # letrec
  tagman = undefined

  class Project
    constructor: ( @$e ) ->
      @_id = 'project' + serial()
    id:         -> @_id
    is_visible: -> tagman.is_visible @id()
    tags:       -> split_tags @$e.data 'tags'
    refresh:    ->
      #@$e.css 'display', if @is_visible() then 'block' else 'none'
      if @is_visible() then @$e.show() else @$e.hide()

  projects = $('ul.projects-source > li').toArray().map (x) -> new Project $ x
  do ( config = {} ) ->
    projects.forEach (p) -> config[p.id()] = p.tags()
    tagman = tag_manager config

  refresh = -> serial_cell serial()
  radioactive ->
    serial_cell()
    projects.forEach (p) -> p.refresh()

  draw_tag = ( tag ) ->
    selected  = -> serial_cell() ; tag in tagman.selected_tags()
    count     = -> serial_cell() ; tagman.count_for_tag tag
    disabled  = -> count() is 0
    state = -> if selected() then 'selected' else if disabled() then 'disabled' else 'normal'
    'li.button.tag-button'._
      class: -> 'tag-button-' + state()
      _onclick: ->
        unless disabled()
          tagman.toggle_tag(tag)
          refresh()
      ->
        'span'._ tag.split(':')[1]
        'span.tag-counter'._ -> if ( selected() or disabled() ) then '' else  count() + ''

  $('#projects-core-header').append 'div'._ ->
    'div'._ $width: '15px', ' '
    'ul.tag-list'._ ->
      for own k, v of tag_types then do (k, v) ->
        'li h4'._ v.label
        tagman.all_tags().forEach (tag) ->
          draw_tag tag if tag.split(':')[0] is k