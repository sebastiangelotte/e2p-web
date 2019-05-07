import React from 'react'

import { Player } from 'video-react'

const Account = () => (
    <div>
        <section class="section section--grid section--center-content">
            <div class="section__column section__column--6">
                <Player
                    autoPlay
                    playsInline
                    width="300"
                    poster="/logo.svg"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
            </div>
        </section>
    </div>
)

export default Account
