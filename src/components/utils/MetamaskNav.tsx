import { Button, Text } from "@chakra-ui/react";
import { useMetaMask } from "metamask-react";

const MetamaskNav: React.FC = ({}) => {
  const { status, connect, account, chainId } = useMetaMask();
  if (status === "notConnected") {
    return (
      <Button onClick={connect} colorScheme='cyan' color='white'>
        Connect Wallet
      </Button>
    );
  }
  if (status === "connecting") {
    return <Text color='white'>Connecting to wallet...</Text>;
  }
  if (status === "unavailable") {
    return <Text color='white'>Metamask is unavailable.</Text>;
  }
  if (status === "initializing") {
    return <Text color='white'>Metamask is initializing....</Text>;
  }
  if (status === "connected") {
    return (
      <Text color='white'>
        {account} connected on chain: {chainId}
      </Text>
    );
  }

  return <></>;
};

export default MetamaskNav;
