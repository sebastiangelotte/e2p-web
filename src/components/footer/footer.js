import React from 'react'
import { Link } from 'gatsby'

import {
    Segment,
    Container,
    Grid,
    List,
    Header
} from 'semantic-ui-react'

const style = {
    segment: {
        paddingTop: '6em',
        paddingBottom: '6em'
    }
}


const Footer = () => {
    return (
        <Segment style={style.segment} color="blue" vertical inverted>
            <Container>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <List link inverted>
                                <List.Item><Link to="services">Tjänster</Link></List.Item>
                                <List.Item><Link to="courses">Kurser</Link></List.Item>
                                <List.Item><Link to="tools">Verktyg</Link></List.Item>
                                <List.Item><Link to="webinars">Webinars</Link></List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <List link inverted>
                                <List.Item><Link to="about">Om oss</Link></List.Item>
                                <List.Item><Link to="contact">Kontakt</Link></List.Item>
                                <List.Item><Link to="newsletter">Nyhetsbrev</Link></List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column floated="right" width={6}>
                            <Header as="h4" inverted>Läs vårt nyhetsbrev!</Header>
                            <p>Anmäl dig till vårt nyhetsbrev för smarta checklistor, enkla råd & tips.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    )
}

export default Footer
