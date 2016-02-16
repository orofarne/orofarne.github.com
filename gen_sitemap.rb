#!/usr/bin/env ruby

require 'json'

puts '<?xml version="1.0" encoding="UTF-8"?>'
puts '<urlset'
puts '      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
puts '      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'
puts '      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9'
puts '            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'
puts ''

puts '<url>'
puts '  <loc>https://orofarne.ru/</loc>'
puts '</url>'

Dir.glob('*').select {|f| File.directory? f}.each { |d|
	puts '<url>'
	puts "  <loc>https://orofarne.ru/#{d}</loc>"
	puts '</url>'
}

# sputnik_mapping_parties
mp_contents = File.read('sputnik_mapping_parties/data.js')
mp_contents.sub! /^var _data = /, ''
mp_contents.sub! /;$/, ''
mp_data = JSON.parse(mp_contents)
mp_data['features'].each{ |feature|
	hash = (feature['properties']['date'] + ' - ' + feature['properties']['title']).gsub(/\s+/, '_')
	puts '<url>'
	puts "  <loc>https://orofarne.ru/sputnik_mapping_parties/#!#{hash}</loc>"
	puts '</url>'
}

#
puts '</urlset>'
