import React, { useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'
import { getPostsPage } from '../../api/axios.js'


export default function ThreeColumnsInfiniteScroll(){
    // "name": string
    // "description": string
    // "resource_url": string
    // "store_id": number
    // "store_name": string
		// "product_id": number
    // "store_description": string
    // "price": number
  

	const Post = React.forwardRef(({ post }, ref) => {

		const postBody = (
			<>
				<a href={`/buyer/product/${post.product_id}`}>
					<img src={post.resource_url} alt={post.name} />
				</a>
			</>
		)
	
		const content = ref
			? <div ref={ref}>{postBody}</div>
			: <div>{postBody}</div>
	
		return content
	})

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		data,
		status,
		error,
	} = useInfiniteQuery({
		queryKey: ['/posts'],
		queryFn: ({ pageParam = 1 }) => getPostsPage(pageParam),
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length ? allPages.length + 1 : undefined;
		},
	});

	const intObserver = useRef()

	const lastPostRef = useCallback(post => {
		if (isFetchingNextPage) return

		if (intObserver.current) intObserver.current.disconnect()

		intObserver.current = new IntersectionObserver(posts => {
			if (posts[0].isIntersecting && hasNextPage) {
				fetchNextPage()
			}
		})

		if (post) intObserver.current.observe(post)
	}, [isFetchingNextPage, fetchNextPage, hasNextPage])

	// if (status === 'error') return <p className='center'>Error: {error.message}</p>
	
	const content = data?.pages.map(pg => {
		return pg.map((post, i) => {
			if (pg.length === i + 1) {
				return <Post ref={lastPostRef} key={post.id} post={post} />
			}
			return <Post key={post.id} post={post} />
		})
	})

	return (
		<div className="photo-mosaic">
			{content}
			{isFetchingNextPage && <p className="center">Loading...</p>}
		</div>
	)
}