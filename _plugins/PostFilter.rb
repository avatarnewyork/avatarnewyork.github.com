module Jekyll
	module PostFilter
		def filter_post_by_tags(posts)
			filtered = []
			for post in posts
				filtered.push(post) unless post.tags.include?'featured'
			end
			return filtered
		end
	end
end
 
Liquid::Template.register_filter(Jekyll::PostFilter)