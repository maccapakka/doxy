"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button, Group, Text } from "@doxy/design-system/components";
import styles from "./page.module.css";
import {
  Chat,
  Dots,
  MeetingCameraAnimated,
  MicrophoneAnimated,
  Phone,
} from "@doxy/design-system/icons";
import { Frame } from "@doxy/design-system/group";
import { Icon } from "@doxy/design-system/icon";
import { SettingsIcon } from "@doxy/design-system/icons/SettingsIcon.tsx";
import { MicrophoneOffIcon } from "@doxy/design-system/icons/MicrophoneOffIcon.tsx";
import { LayoutIcon } from "@doxy/design-system/icons/LayoutIcon.tsx";
import { ReportIcon } from "@doxy/design-system/icons/ReportIcon.tsx";

const containerVariants = {
  hidden: { opacity: 0, scaleX: 0.5 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const dropdownMenuVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.15,
      ease: "easeOut" as const,
      staggerChildren: 0.05,
    },
  },
};

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
    },
  },
};

export default function Home() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);

  return (
    <div className={styles.page}>
      <Group
        as={motion.div}
        alignSelf="flex-start"
        justifySelf="flex-start"
        borderRadius="9999px"
        paddingInline={4}
        paddingBlock={2}
        backgroundColor="black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1,
          ease: "easeOut",
        }}
      >
        <Text variant="body-3" color="white">
          Doctor McCann | Doxy.me
        </Text>
      </Group>
      <Group
        as={motion.div}
        alignItems="flex-end"
        justifyContent="center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Group
          className={styles.controlBar}
          padding={2}
          borderRadius="16px"
          gap={2}
        >
          <Button
            as={motion.button}
            variants={itemVariants}
            icon={<MeetingCameraAnimated isOff={!isCameraOn} />}
            active={isCameraOn}
            onClick={() => setIsCameraOn(!isCameraOn)}
            tooltip={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
          />
          <Button
            as={motion.button}
            variants={itemVariants}
            icon={<MicrophoneAnimated isOff={!isMicOn} />}
            active={isMicOn}
            onClick={() => setIsMicOn(!isMicOn)}
            tooltip={isMicOn ? "Turn Microphone Off" : "Turn Microphone On"}
          />
          <Button
            as={motion.button}
            variants={itemVariants}
            icon={<Chat />}
            tooltip="Open Chat"
          />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                as={motion.button}
                variants={itemVariants}
                icon={<Dots />}
                tooltip="More Options"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                asChild
                className={styles.dropdownContent}
                sideOffset={8}
                side="top"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={dropdownMenuVariants}
                >
                  <DropdownMenu.Item asChild className={styles.dropdownItem}>
                    <motion.div variants={dropdownItemVariants}>
                      <Group alignItems="center" gap={3}>
                        <Icon svg={SettingsIcon} size={4} color="white" />
                        <Text variant="body-3">Settings</Text>
                      </Group>
                    </motion.div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild className={styles.dropdownItem}>
                    <motion.div variants={dropdownItemVariants}>
                      <Group alignItems="center" gap={3}>
                        <Icon svg={MicrophoneOffIcon} size={4} color="white" />
                        <Text variant="body-3">Audio Effects</Text>
                      </Group>
                    </motion.div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild className={styles.dropdownItem}>
                    <motion.div variants={dropdownItemVariants}>
                      <Group alignItems="center" gap={3}>
                        <Icon svg={LayoutIcon} size={4} color="white" />
                        <Text variant="body-3">Change Layout</Text>
                      </Group>
                    </motion.div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator
                    className={styles.dropdownSeparator}
                  />
                  <DropdownMenu.Item asChild className={styles.dropdownItem}>
                    <motion.div variants={dropdownItemVariants}>
                      <Group alignItems="center" gap={3}>
                        <Icon svg={ReportIcon} size={4} color="critical" />
                        <Text variant="body-3" color="critical">
                          Report Issue
                        </Text>
                      </Group>
                    </motion.div>
                  </DropdownMenu.Item>
                </motion.div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <Button
            as={motion.button}
            variants={itemVariants}
            whileTap={{
              scale: 0.85,
              transition: {
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            whileHover={{
              scale: 1.05,
              transition: {
                duration: 0.2,
              },
            }}
            onMouseEnter={() => setIsPhoneHovered(true)}
            onMouseLeave={() => setIsPhoneHovered(false)}
            color="critical"
            icon={
              <motion.div
                style={{ display: "inline-flex" }}
                animate={
                  isPhoneHovered
                    ? {
                        rotate: [0, -15, 15, -15, 15, -10, 10, 0],
                        transition: {
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 0.1,
                        },
                      }
                    : { rotate: 0 }
                }
              >
                <Phone />
              </motion.div>
            }
            tooltip="End Call"
          />
        </Group>
      </Group>
      <AnimatePresence>
        {isCameraOn && (
          <Frame
            as={motion.div}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
            }}
            position="absolute"
            bottom="48px"
            right="48px"
            padding={4}
            alignItems="flex-start"
            height="260px"
            width="300px"
            backgroundColor="primary"
            backgroundImage="url('/woman-small.png')"
            backgroundSize="cover"
            backgroundPosition="center"
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
            border="2px solid rgba(255, 255, 255, 0.8)"
          >
            <Group
              borderRadius="9999px"
              paddingInline={4}
              paddingBlock={2}
              backgroundColor="black"
            >
              <Text variant="body-3" color="white">
                You
              </Text>
            </Group>
          </Frame>
        )}
      </AnimatePresence>
    </div>
  );
}
