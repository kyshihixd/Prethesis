
        async function handleVote(event) {
            event.stopPropagation();
            const button = event.currentTarget;
            const reviewId = button.dataset.reviewId;
            const voteType = button.dataset.voteType;


            try {
                const response = await fetch(`/reviews/${reviewId}/${voteType}`, {
                    method: 'POST',
                });

                if (response.status === 401) {
                    alert("You must be logged in to vote. Redirecting to login...");
                    return window.location.href = "/login";
                }

                if (!response.ok) {

                    const errorData = await response.json();
                    throw new Error(errorData.message || `Failed to ${voteType} review.`);
                }

                const updatedReview = await response.json();

                document.getElementById(`upvote-count-${reviewId}`).textContent = updatedReview.upvote.length;
                document.getElementById(`downvote-count-${reviewId}`).textContent = updatedReview.downvote.length;

            } catch (error) {
                console.error(`Error ${voteType}ing review:`, error);
                alert(error.message);
            }
        }