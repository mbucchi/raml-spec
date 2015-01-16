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
      constructor: ( @data ) ->
        @_id = 'project' + serial()
      id:         -> @_id
      is_visible: -> tagman.is_visible @id()
      tags:       -> @_tags ?= do =>
        xx = []
        for own k, v of @data.tags
          @data.tags[k].forEach (tag) ->
            xx.push k + ':' + tag
        xx
      refresh:    ->
        #@$e.css 'display', if @is_visible() then 'block' else 'none'
        if @is_visible() then $(@ui()).show() else $(@ui()).hide()
      ui: -> @_ui ?= do =>
        project = @data
        'li'._ ->
          '.project-title'._ ->
            '.icon'._()
            'h3'._ ->
              'a.anchor'._ href : '#', ->
                'span'._()
              'text'._ ->
                if project['title'] then project['title'] else project['gh:full_name'].split('/')[1]
            'h4'._ 'Developed by ' + project.tags['developer']
            'h4 i'._ 'License: ' + project.tags['license'] if project.tags['license']?
            'p'._ project.tags['status']
            'a.project-github'._ href : project['id'] , target : '_blank', 'View on Github'
          '.project-description p'._ project['description']

  window._projects_callback = ( data ) ->

    tagman = null

    projects = data.map (d) -> new Project d

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


    do ( config = {} ) ->
      projects.forEach (p) -> config[p.id()] = p.tags()
      tagman = tag_manager config


    $('#projects-core-header').append 'div'._ ->
      'div'._ $width: '15px', ' '
      'ul.tag-list'._ ->
        for own k, v of tag_types then do (k, v) ->
          'li h4'._ v.label
          tagman.all_tags().forEach (tag) ->
            draw_tag tag if tag.split(':')[0] is k

    projects.forEach (project) ->
      $('.projects-source').prepend project.ui()

  script = document.createElement('script')
  script.type='text/javascript'
  script.src='https://drive.google.com/uc?export=download&id=0B9LuWXmFpvzWSHlhVG0xbWdMN00'
  $("body").append(script)

