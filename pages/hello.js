import { Container, Row, Col, Button } from 'react-bootstrap'
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient"

const helloQuery = gql`
    query {
        hello
    }
`

const timeQuery = gql`
    query {
        time
    }
`

export async function getStaticProps() {

    const apolloClient = initializeApollo();

    await apolloClient.query({ query: helloQuery });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
      revalidate: 1,
    };
}

export default () => {

    let helloData

    helloData = useQuery(helloQuery).data

    const [buttonClick, { called, loading, data }] = useLazyQuery(
        timeQuery,
        { fetchPolicy: "network-only" }
      );

    return (
        <Container>
            <Row>
                <Col md={6} sm={12}>
                    <div>Hello {helloData?.hello}, this is an example of a server side rendered query.</div>

                    <div>
                        <p>This button is used to demonstrate a query executed by the client.</p>
                        <p><Button onClick={buttonClick}>Click Me</Button></p>
                        <p>{data?.time}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
