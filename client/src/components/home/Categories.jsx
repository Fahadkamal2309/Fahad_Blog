import { Button, Table, TableHead, TableRow, TableCell, TableBody, Box, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../constants/data';

// 🔵 Sidebar container with scroll
const Wrapper = styled(Box)`
    width: 100%;
    padding: 10px;
    margin-top: 5px;

    /* 👇 SCROLL ENABLE */
    max-height: calc(100vh - 120px);
    overflow-y: auto;

    background: rgba(255,255,255,0.8);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);

    /* scrollbar styling */
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #888;
    }
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <Wrapper>

            {/* CREATE BUTTON */}
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" fullWidth sx={{ mb: 2 }}>
                    Create Blog
                </Button>
            </Link>

            {/* TABLE */}
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                            Categories
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                All Categories
                            </Link>
                        </TableCell>
                    </TableRow>

                    {categories.map(cat => (
                        <TableRow key={cat.id}>
                            <TableCell>
                                <Link
                                    to={`/?category=${cat.type}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {cat.type}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>

        </Wrapper>
    );
};

export default Categories;